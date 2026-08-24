import React from "react";
import { Anchor, Button, Container, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/index.js";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();

  return (
    <Container h="100%" size="lg">
      <Group h="100%" justify="space-between">
        <Anchor component={Link} to="/" fw={600} underline="never">
          {t(($) => $.Home)}
        </Anchor>
        {!!user && (
          <Button variant="light" onClick={logOut}>
            {t(($) => $.logout)}
          </Button>
        )}
      </Group>
    </Container>
  );
};

export default Navbar;
