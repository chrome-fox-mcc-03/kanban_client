import LandingPage from './views/landingPage.vue';
import board from './views/board.vue';
import loginForm from './components/loginForm.vue';
import registerForm from './components/registerForm.vue';

export const routes = [
 { path: '', component: LandingPage, children: [
   {
    path: '',
    component: loginForm,
   },
   {
    path: 'register',
    component: registerForm
    ,
   },
 ] },
 { 
    path: '/board', 
    component: board, 
    name: 'board',
  }
];
