import React from "react";
import { login, Login } from "../../../apis/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../style.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { MSG_SUCCESS } from "../../../utils/constants";
type Props = {
  onClose?: any;
};

const Login = (props: Props) => {
  const { login: _login } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const res = await login(data);
      const { message, data: _data } = res;
      if (message === MSG_SUCCESS) {
        _login(_data.user, _data.accessToken);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          type="text"
          id="email"
          className="form-control"
          autoComplete="off"
          {...register("email")}
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          className="form-control"
          autoComplete="off"
          {...register("password")}
        />
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
      </div>
      <button className={styles.btn} type="submit">
        Đăng nhập
      </button>
    </form>
  );
};

export default Login;
