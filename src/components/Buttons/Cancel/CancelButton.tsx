import { Button } from "@mantine/core";
import { IconTrashX } from "@tabler/icons";
import axios from "axios";
import React, { EventHandler, useState } from "react";

interface CancelButtonProps {
  url: string;
  type: string;
}

function CancelButton({ url, type }: CancelButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    console.log("clicou");

    setLoading(true);

    axios
      .get("http://localhost:3001/cancel", {
        method: "GET",
        params: { url, type },
      })
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return (
    <Button loading={loading} onClick={handleClick}>
      <IconTrashX size={16} />
    </Button>
  );
}

export default CancelButton;
