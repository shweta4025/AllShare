module.exports = ({emailFrom, downloadLink, size, expires}) =>{

return `
        <!doctype html>
          <html>
          <head>
             <title> Email </title>
             <style>
                body{
                    background-color: cornsilk;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    color: black;
                }
                div{
                    display: inline-block;
                        border: none;
                        cursor: pointer;
                        border-radius: 6px;
                        padding: 8px 40px;
                        margin-top: 15px;
                        background-color: rgb(15, 168, 41);
                        text-decoration: none;
                        color: cornsilk;
                }
                </style>
          </head>
          <body>
             <h3>HI THERE </h1>
             <h2>${emailFrom} has sent you a file.</h2>

             <p> ${size} kb file. Expires in ${expires} hrs. </p>
             <div>
             <a href="${downloadLink}">Download File</a>
             </div>
             <p> Thanku for using AllShare </p>
             

          </body>
          </html>
`;
}