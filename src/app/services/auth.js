import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()

export const signUp = (first_name, last_name, email, password) => {
  return new Promise((resolve, reject) => {
    wservice.signUp({ email, first_name, last_name, password })
      .then((response) => {
        if (response.statusCode == 201) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    wservice.signIn(email, password)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body.token)
          console.log(response.body.token)
        } else if (response.statusCode == 403) {
          reject(__.t('Email or password is incorrect'))
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getCustomerInfo = (userId=null) => {
  return new Promise((resolve, reject) => {

    if (userId == null) {
      if (typeof global.userToken == "undefined" || global.userToken == null || global.userToken.length == 0) {
        return reject("invalid token")
      }
      wservice.getUserId(global.userToken)
        .then((response) => {
          if (response.statusCode == 200) {
            let userId = response.body.id
            wservice.getUserInfo(userId)
              .then(({ statusCode, body }) => {
                if (statusCode == 200) {
                  resolve(body)
                } else {
                  reject(body.message)
                }
              })
              .catch(reject)
          } else {
            reject(response.body.message)
          }
        })
        .catch(reject)
    }else{
      wservice.getUserInfo(userId)
      .then(({ statusCode, body }) => {
          if (statusCode == 200) {
            resolve(body)
          } else {
            reject(body.message)
          }
      })
      .catch(reject)
    }
  })
}

export const signInFacebook = (accessToken) => {
  return new Promise((resolve, reject) => {
    if (accessToken) {
      wservice.signInFacebook(accessToken).then((res) => {
        if(res.statusCode == 200) {
          resolve(res.body)
        }
      })
      .catch(reject)
    } else {
      reject('invalid token')
    }
  })
}
