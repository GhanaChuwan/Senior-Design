exports.passwordResetUI = ({ name }) => {
  return `
  <!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email Template</title>
      <meta name="description" content="Reset Password Email Template." />
      <style type="text/css">
        a:hover {
          text-decoration: underline !important;
        }
      </style>
      <style>
        input[type="password"] {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          box-sizing: border-box;
        }
      </style>
    </head>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="margin: 0px; background-color: #f2f3f8"
      leftmargin="0"
    >
      <!--100% body table-->
      <table
        cellspacing="0"
        border="0"
        cellpadding="0"
        width="100%"
        bgcolor="#f2f3f8"
        style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: 'Open Sans', sans-serif;
        "
      >
        <tr>
          <td>
            <table
              style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <a href="https://rakeshmandal.com" title="logo" target="_blank">
                    <img
                      width="60"
                      src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png"
                      title="logo"
                      alt="logo"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 670px;
                      background: #fff;
                      border-radius: 3px;
                      text-align: center;
                      -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    "
                  >
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 35px">
                        <h1
                          style="
                            color: #1e1e2d;
                            font-weight: 500;
                            margin: 0;
                            font-size: 32px;
                            font-family: 'Rubik', sans-serif;
                          "
                        >
                          <strong>${name}</strong><br />
                          Enter new password
                        </h1>
                        <br />
                        <form>
                          <label for="fname">New Password:</label>
                          <input type="password" id="password" name="password" />
                          <label for="fname">Confirm New Password:</label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                          />
                        </form>
                        <a
                          style="
                            background: #20e277;
                            text-decoration: none !important;
                            font-weight: 500;
                            margin-top: 35px;
                            color: #fff;
                            text-transform: uppercase;
                            font-size: 14px;
                            padding: 10px 24px;
                            display: inline-block;
                            border-radius: 50px;
                            cursor: pointer;
                          "
                          onclick="sendNewPassword()"
                        >
                          Reset Password
                        </a>
                        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  
                        <script>
                          const sendNewPassword = async () => {
                            const password =
                              document.getElementById("password").value;
                            const confirmPassword =
                              document.getElementById("confirmPassword").value;
                            console.log({
                              password,
                              confirmPassword,
                            });
  
                            if (password != confirmPassword) {
                              alert("Password does not match!");
                            } else if (password.length < 8) {
                              alert(
                                "Password needs to be greater then 8 characters!"
                              );
                            } else {
                              const queryString = window.location;
  
                              const test = queryString.pathname.substring(1);
                              let data = test.substr(
                                test.search("/") + 1,
                                test.length
                              );
                              let userId = data.substr(0, data.search("/"));
                              let token = data.substr(
                                data.search("/") + 1,
                                data.length
                              );
  
                              try {
                                const response = await axios.post(
                                  "http://www.localhost:4000/reset-password",
                                  {
                                    password: password,
                                    token: token,
                                    userId: userId,
                                  }
                                );
                                console.log(response.response.data);
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          };
                        </script>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
  
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <p
                    style="
                      font-size: 14px;
                      color: rgba(69, 80, 86, 0.7411764705882353);
                      line-height: 18px;
                      margin: 0 0 0;
                    "
                  ></p>
                </td>
              </tr>
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--/100% body table-->
    </body>
  </html>
  

  `;
};
