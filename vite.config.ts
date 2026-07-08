import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function leetcodeProxy(): any {
  return {
    name: 'leetcode-proxy',
    configureServer(server: any) {
      server.middlewares.use('/api/leetcode-stats', async (_req: any, res: any) => {
        try {
          const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Referer': 'https://leetcode.com',
            },
            body: JSON.stringify({
              query: `
                query userProblemsSolved($username: String!) {
                  matchedUser(username: $username) {
                    submitStatsGlobal {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                  }
                }
              `,
              variables: { username: "Bhumi_1808" }
            })
          });
          const data = await response.json();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch stats' }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), leetcodeProxy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
