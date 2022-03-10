import axios from "axios";
import MockAdapter from "axios-mock-adapter";


let users = [
    {
      uid: 1,
      username: "demo",
      role: "demo",
      password: "123456",
      email: "demo@demo.com",
    },
];

const fakeBackend = () => {
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

    mock.onPost("/post-fake-login").reply(config => {
        const user = JSON.parse(config["data"]);
        console.log('entro')
        const validUser = users.filter(
          usr => usr.email === user.email && usr.password === user.password
        );
    
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (validUser["length"] === 1) {
              resolve([200, validUser[0]]);
            } else {
              reject([
                "Username and password are invalid. Please enter correct username and password",
              ]);
            }
          });
        });
    });
    
}

export default fakeBackend;