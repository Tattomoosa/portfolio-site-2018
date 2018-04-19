import { auth } from 'firebase'

export default {
  signInSuccessUrl: '/',
  signInOptions: [
    auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service' // This doesn't exist ha ha!
}
