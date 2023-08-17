var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }

  // 注册
  // async function reg(userInfo) {
  //   const resp = await fetch(BASE_URL + "/api/user/reg", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userInfo),
  //   }); //.then((resp) =>  resp.json());
  //   return await resp.json();
  // }
  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo); //.then((resp) =>  resp.json());
    return await resp.json();
  }

  // 登录
  // async function login(loginInfo) {
  //   const resp = await fetch(BASE_URL + "/api/user/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify(loginInfo),
  //   }); //.then((resp) =>  resp.json());
  //   const result = await resp.json();
  //   // console.log(resp);

  //   // 登录成功
  //   if (result.code === 0) {
  //     // 用本地本地存储localStorage将响应头中的令牌authorizationn保存起来
  //     const token = resp.headers.get("authorization");
  //     localStorage.setItem(TOKEN_KEY, token);
  //   }
  //   // 失败直接返回结果
  //   return result;
  // }
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo); //.then((resp) =>  resp.json());
    const result = await resp.json();
    // console.log(resp);
    // 登录成功
    if (result.code === 0) {
      // 用本地本地存储localStorage将响应头中的令牌authorizationn保存起来
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    // 失败直接返回结果
    return result;
  }

  // 账号验证
  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  // 当前登录用户信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  // 发送聊天消息
  async function sendChat(content) {
    const resp = await post("/api/chat", { 
      content 
    });
    return await resp.json();
  }
  // 获取聊天记录
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }
  // 退出登录
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
