import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import { loginUser } from '../reducers/currUser';
import Toggleable from './Toggleable';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginFormRef = useRef();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async ({ username, password }) => {
    dispatch(
      loginUser({
        username,
        password,
      })
    );
    loginFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="Login" ref={loginFormRef}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl isInvalid={errors.username} mb={4}>
          <Input
            id="username-login"
            placeholder="username"
            {...register('username', {
              required: 'Username required',
              minLength: { value: 3, message: 'Minimum length should be 3' },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mb={4}>
          <Input
            id="password-login"
            type={'password'}
            placeholder="password"
            {...register('password', {
              required: 'Password required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          w={'full'}
          mb={2}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          id="loginSubmitBtn"
        >
          Login
        </Button>
      </form>
    </Toggleable>
  );
};

export default LoginForm;
