import Router from 'next/router';

export default function redirect(context, target) {
  if (context.req) {
    // server
    // 303: "See Other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // browser
    Router.push(target);
  }
}
