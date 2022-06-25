import React, { useState, useEffect } from "react";
import { Button, TextField, Card, CardContent, Stack, Typography } from "@mui/material";

const Decrypt = () => {
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [decrypted, setDecrypted] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        decryptMessage(data);
      }, [data]);

    const decryptMessage = async (message) => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const decrypted = await window.ethereum.request({
            method: 'eth_decrypt',
            params: [message, accounts[0]],
        });
        setDecrypted(decrypted);
    };

    function handleDecryptClick () {
        decryptMessage();
        setData(encryptedMessage);
      }

    return (
        <Card sx={{width: 500, maxWidth: 500}}>
            <CardContent>
            <Typography gutterBottom textAlign="center" fontWeight="bold">Decryption</Typography>
              <Stack direction="column" spacing={3}>
                <TextField fullWidth multiline label="Encrypted Data" value={encryptedMessage} onChange={(e) => {setEncryptedMessage(e.target.value)}}/>
                <Button variant="contained" onClick={() => {handleDecryptClick()}}>Decrypt Message</Button>
                <Typography sx={{overflowWrap: "break-word"}}>{decrypted}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );

};

export default Decrypt;