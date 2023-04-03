<script setup lang="ts">

import { useForm } from 'vee-validate';
import { SignupSchema } from './schema/sign-up.schema';
import  bcrypt from 'bcryptjs'
import axios from 'axios'
//const serverURL = process.env.Server_URL
  const salt = bcrypt.genSaltSync(10)
const { errors, useFieldModel, handleSubmit } = useForm({ 
  validationSchema: SignupSchema
});
const onSubmit = handleSubmit(values => {
  const email = values.email
  const password = values.password
  const hashedPassword = bcrypt.hashSync(password, salt)  
  const user = {
    email: email,
    password: hashedPassword,
  }
  axios.post('https://example-url.com', user)
})
const [email, password, confirmedPassword] = useFieldModel(['email', 'password', 'confirmedPassword']);
</script>

<template>
    <div class='h-screen flex justify-center items-center bg-emerald-300'>

<form class='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
  @submit.prevent="onSubmit"
  >
  <div class='mb-4'>
  <label class='block text-gray-700 text-sm font-bold mb-2' 
    htmlFor="email">Email Address</label>
  <input
    class="shadow appearance-none border
    rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
    focus:outline-none focus:shadow-outline"
    id="email"
    name="email"
    type="email"
    v-model="email"
    
  />
  <p class="text-gray-500 text-xs" v-show="errors.email">{{errors.email}}</p> 
  </div>
  <div class='mb-4'>
  <label class='block text-gray-700 text-sm font-bold mb-2'
    htmlFor="password">Password</label>
  <input
    class='shadow appearance-none border
    rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
    focus:outline-none focus:shadow-outline'
    id="password"
    name="password"
    type="password"
    v-model="password"
   
  />
  <p class="text-gray-500 text-xs" v-show="errors.password">{{errors.password}}</p> 
  </div>
  <div class='mb-4'>
  <label class='block text-gray-700 text-sm font-bold mb-2'
    htmlFor="password">Confirm Password</label>
  <input
    class="shadow appearance-none border
    rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
    focus:outline-none focus:shadow-outline"
    id="confirmedPassword"
    name="confirmedPassword"
    type="password"
    v-model="confirmedPassword"
  />
  <p class="text-gray-500 text-xs" v-show="errors.confirmedPassword">{{errors.confirmedPassword}}</p> 
  </div>
  <button class="bg-emerald-400 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    >
    Sign up
  </button>
</form>
</div> 
    
</template>