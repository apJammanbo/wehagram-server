import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./shcema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
/**
 * GraphQLServer 생성
 */
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

/**
 * 미들웨어 설정
 */
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port }, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
