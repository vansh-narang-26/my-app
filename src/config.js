// export const base_url = "https://akira-ai-auth.lab.neuralcompany.team";
// export const api_link =
//   "https://api.hsforms.com/submissions/v3/integration/submit/8162471/251890aa-bcbe-4a51-acac-3aeb0e8123b4";
// const local = {
//   info: {
//     REACT_APP_WEBSITE_URL: "https://agenthr-website.lab.neuralcompany.team/",
//   },
// };

// const dev = {
//   auth: {
//     REACT_APP_AUTH_URL: "https://akira-ai-auth.lab.neuralcompany.team",
//   },
//   app: {
//     WORKSPACE_DOMAIN_NAME: ".neuralcompany.team",
//   },
//   info: {
//     REACT_APP_WEBSITE_URL: "https://agenthr-website.lab.neuralcompany.team/",
//   },
// };

// const prod = {
//   auth: {
//     REACT_APP_AUTH_URL: "https://app.akira.ai/api/auth",
//   },
//   app: {
//     WORKSPACE_DOMAIN_NAME: ".akira.ai",
//   },
//   info: {
//     REACT_APP_WEBSITE_URL: "https://agenthr.ai/",
//   },
// };

// const config =
//   process.env.REACT_APP_STAGE === "production"
//     ? prod
//     : process.env.REACT_APP_STAGE === "development"
//     ? dev
//     : // : process.env.REACT_APP_STAGE === "uat"
//       // ? uat
//       local;
// // eslint-disable-next-line
// export default {
//   ...config,
// };
export const base_url = "http://localhost:5436"; 


  const local = {
    info: {
      REACT_APP_WEBSITE_URL: "http://localhost:5436/",
    },
    app: {
      WORKSPACE_DOMAIN_NAME: ".localhost",
    },
    api_link: "https://api.hsforms.com/submissions/v3/integration/submit/242072892/2fd12ce4-8805-4a13-a47e-667d985cdbd4",
  };


const config = local;
// eslint-disable-next-line
export default {
  ...config,
};
