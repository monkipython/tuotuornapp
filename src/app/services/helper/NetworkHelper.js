class NetworkHelper {

  static requestPost(url, params, headers = null) {
    return NetworkHelper.requestHttp('POST',url, params, headers)
  }

  static requestGet(url, headers = null) {
    return NetworkHelper.requestHttp('GET',url, null, headers)
  }

  static requestPut(url, params, headers = null) {
    return NetworkHelper.requestHttp('PUT',url, params, headers)
  }

  static requestPatch(url, params, headers = null) {
    return NetworkHelper.requestHttp('PATCH',url, params, headers)
  }

  static requestDelete(url, params, headers = null) {
    return NetworkHelper.requestHttp('DELETE',url, params, headers)
  }

  static requestHttp(method,url, params, headers) {
    return new Promise((resolve, reject) => {
      var options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      if (params) {
        options.body = JSON.stringify(params)
      }
      if (headers) {
        options.headers['Authorization'] = 'Bearer ' + headers
      }
      fetch(url, options)
        .then((response) => {
          response.json()
          .then((body)=>{
            console.log({statusCode:response.status,body});
            resolve({statusCode:response.status,body})
          })
          .catch((error)=>{
            console.log(error);
            reject(__.t('Can not connect to server'))
          })
        })
        .catch((error) => {
          console.log(error);
          reject(__.t('Can not connect to server'))
        });
    });
  }
}

export default NetworkHelper
