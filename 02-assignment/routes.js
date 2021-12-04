const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>02-Assignment</title></head>");
    res.write(`
      <body>
        <h3>Welcome to '/'</h3>
        <b>Create a new User</b>
        <form action="/create-user" method="POST">
          <input type="text" name="username">
          <button type="submit">Create</button>
        </form>
      </body>
    `);
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>02-Assignment</title></head>");
    res.write(`
      <body>
        <h3>User List</h3>
        <ul>
          <li>lookininward</li>
          <li>mxbeyondborders</li>
          <li>another1</li>
        </ul>
      </body>
    `);
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    // get request data
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      // log user to create
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log("user", user);
      res.writeHead(302, { Location: "/" });
      return res.end();
    });
  }
};

module.exports = { handler: requestHandler };
