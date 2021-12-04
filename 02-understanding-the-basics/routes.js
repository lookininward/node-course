const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      `<body>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <button type="submit">Go</button>
        </form>
      </body>`
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    // get request data
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      // create new file and store user's message
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        // done working with file
        // redirect user to /
        res.writeHead(302, { Location: "/" });
        return res.end();
      });
    });
  }

  // default
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Test</title></head>");
  res.write("<body><h1>Monkey</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = { handler: requestHandler };
