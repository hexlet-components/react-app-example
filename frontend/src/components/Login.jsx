// @ts-check

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  Anchor,
  Button,
  Card,
  Center,
  Container,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";
import avatarImages from "../assets/avatar.jpg";

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    setAuthFailed(false);

    try {
      const res = await axios.post(routes.loginPath(), values);
      auth.logIn(res.data);
      const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
      navigate(from);
    } catch (err) {
      console.error(err);
      if (!err.isAxiosError) {
        notifications.show({ color: "red", message: t(($) => $.errors.unknown) });
        return;
      }

      if (err.response?.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
      } else {
        notifications.show({ color: "red", message: t(($) => $.errors.network) });
      }
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Card shadow="sm" radius="md" padding="xl" withBorder>
        <Group align="center" justify="center" gap="xl" wrap="wrap">
          <Center>
            <Image src={avatarImages} alt={t(($) => $.login.header)} radius="50%" w={200} h={200} />
          </Center>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack w={280} gap="md">
              <Title order={1} size="h2" ta="center">
                {t(($) => $.login.header)}
              </Title>
              <TextInput
                {...form.getInputProps("username")}
                id="username"
                name="username"
                autoComplete="username"
                required
                ref={inputRef}
                label={t(($) => $.login.username)}
                placeholder={t(($) => $.login.username)}
                error={authFailed ? t(($) => $.login.authFailed) : null}
              />
              <PasswordInput
                {...form.getInputProps("password")}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                label={t(($) => $.login.password)}
                placeholder={t(($) => $.login.password)}
                error={authFailed}
              />
              <Button type="submit" variant="outline">
                {t(($) => $.login.submit)}
              </Button>
            </Stack>
          </form>
        </Group>
        <Text ta="center" mt="xl">
          {t(($) => $.login.newToChat)}{" "}
          <Anchor component={Link} to={routes.signupPagePath()}>
            {t(($) => $.login.signup)}
          </Anchor>
        </Text>
      </Card>
    </Container>
  );
};

export default Login;
