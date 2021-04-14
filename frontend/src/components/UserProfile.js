const UserProfile = (function() {
    var user_name = "";
    var user_id = "";
    var token = "";
  
    const getName = function() {
      user_name = window.sessionStorage.getItem('username')
      return user_name;    
    };
  
    const setName = function(name) {
      window.sessionStorage.setItem('username',name)
      
    };

    const getId = function() {
        user_id = window.sessionStorage.getItem('userid')
        return user_id;    
    };
    
    const setId = function(id) {
      window.sessionStorage.setItem('userid',id)   
    };

    const getToken = function() {
      token = window.sessionStorage.getItem('token')
      return token;    
    };

    const setToken = function(token) {
      window.sessionStorage.setItem('token',token)   
    };

    const logout = function() {
      window.sessionStorage.removeItem('userid')   
      window.sessionStorage.removeItem('username')  
      window.sessionStorage.removeItem('token')   
    };
  
  
    return {
      getName: getName,
      setName: setName,
      getId: getId,
      setId: setId,
      getToken: getToken,
      setToken: setToken,
      logout: logout
    }
  
  })();
  
  export default UserProfile;