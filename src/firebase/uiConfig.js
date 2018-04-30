import { auth } from 'firebase'

export default {
  signInOptions: [
    auth.GoogleAuthProvider.PROVIDER_ID,
    // auth.FacebookAuthProvider.PROVIDER_ID,
    // auth.TwitterAuthProvider.PROVIDER_ID,
    // auth.GithubAuthProvider.PROVIDER_ID,
    auth.EmailAuthProvider.PROVIDER_ID,
    // auth.PhoneAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service' // This doesn't exist ha ha!
}
