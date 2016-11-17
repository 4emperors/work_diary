import  data from './Data';

function checkAuth() {
    return false;
}

export default  {
    state: {isAuthed: checkAuth(), userInfo: {}},
    actions: {
        login ({state}, {email, pass, cb}) {
            if (state.isAuthed) {
                if (cb) cb(true)
                return
            }
            pretendRequest(email, pass, state, (res) => {
                if (res.authenticated) {
                    state.isAuthed = true;
                    if (cb) cb(true)
                } else {
                    if (cb) cb(false)
                }
            })
        },
        regist ({state}, {email, pass, cb}) {
            if (state.isAuthed) {
                if (cb) cb(true)
                return
            }
            data.auth().createUserWithEmailAndPassword(email, pass)
                .then(function (user) {
                    state.isAuthed = true;
                    state.userInfo = user;
                    if (cb) {
                        cb(true, user);
                    }
                }).catch(function (err) {
                console.log(err);
                if (cb) cb(false, null);
            });
        },
        logout ({state}, {cb}) {
            data.auth().signOut().then(function () {
                state.isAuthed = false;
                state.userInfo = {};
            });
            if (cb) cb()
        }

    }
}

function pretendRequest(email, pass, state, cb) {
    data.auth().signInWithEmailAndPassword(email, pass).then(function (res) {
        console.log(res)
        state.userInfo = res;
        cb({
            authenticated: true
        })
    }).catch(function (error) {
        cb({
            authenticated: false
        })
    });
}