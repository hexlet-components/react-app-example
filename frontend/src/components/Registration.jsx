// @ts-check

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Image,
  Stack,
  TextInput,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";

import avatarImages from "../assets/avatar_1.jpg";

const Registration = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Выделение переезжает в эффект, потому что обращение к ref из обработчика
  // отправки oxlint считает обращением во время рендера: `form.onSubmit(...)`
  // вычисляется в рендере, и правило react(refs) прослеживает колбэк до ref.
  useEffect(() => {
    if (registrationFailed) {
      inputRef.current.select();
    }
  }, [registrationFailed]);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: (value) => {
        const username = value.trim();
        if (username.length === 0) {
          return t(($) => $.signup.required);
        }

        return username.length < 3 || username.length > 20
          ? t(($) => $.signup.usernameConstraints)
          : null;
      },
      password: (value) => {
        const password = value.trim();
        if (password.length === 0) {
          return t(($) => $.signup.required);
        }

        return password.length < 6 ? t(($) => $.signup.passMin) : null;
      },
      confirmPassword: (value, values) =>
        value === values.password ? null : t(($) => $.signup.mustMatch),
    },
  });

  const handleSubmit = async (values) => {
    setRegistrationFailed(false);

    try {
      const res = await axios.post(routes.signupPath(), {
        username: values.username,
        password: values.password,
      });
      auth.logIn(res.data);
      navigate(routes.chatPagePath());
    } catch (err) {
      if (!err.isAxiosError) {
        throw err;
      }

      if (err.response.status === 409) {
        setRegistrationFailed(true);
        return;
      }

      throw err;
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Card shadow="sm" radius="md" padding="xl" withBorder>
        <Group align="center" justify="center" gap="xl" wrap="wrap">
          <Center>
            <Image
              src={avatarImages}
              alt={t(($) => $.signup.header)}
              radius="50%"
              w={200}
              h={200}
            />
          </Center>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack w={280} gap="md">
              <Title order={1} size="h2" ta="center">
                {t(($) => $.signup.header)}
              </Title>
              <TextInput
                {...form.getInputProps("username")}
                id="username"
                name="username"
                autoComplete="username"
                required
                ref={inputRef}
                label={t(($) => $.signup.username)}
                placeholder={t(($) => $.signup.usernameConstraints)}
                error={
                  registrationFailed
                    ? t(($) => $.signup.alreadyExists)
                    : form.getInputProps("username").error
                }
              />
              <PasswordInput
                {...form.getInputProps("password")}
                id="password"
                name="password"
                autoComplete="new-password"
                required
                label={t(($) => $.signup.password)}
                placeholder={t(($) => $.signup.passMin)}
              />
              <PasswordInput
                {...form.getInputProps("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                required
                label={t(($) => $.signup.confirm)}
                placeholder={t(($) => $.signup.mustMatch)}
              />
              <Button type="submit" variant="outline">
                {t(($) => $.signup.submit)}
              </Button>
            </Stack>
          </form>
        </Group>
      </Card>
    </Container>
  );
};

export default Registration;
