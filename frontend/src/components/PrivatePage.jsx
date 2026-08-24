// @ts-check

import React from "react";
import { Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useAuth } from "../hooks/index.js";

const PrivatePage = () => {
  const { t } = useTranslation();
  const {
    user: { username },
  } = useAuth();

  return (
    <Stack align="center" gap="xs" mt="xl">
      <Title order={2} c="dimmed">
        {t(($) => $.private.header)}
      </Title>
      <Text c="dimmed">{t(($) => $.private.message, { username })}</Text>
    </Stack>
  );
};

export default PrivatePage;
