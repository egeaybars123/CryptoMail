import React, { useState, useEffect } from "react";
import { Button, TextField, Card, CardContent, Stack, Typography} from "@mui/material";

const ethUtil = require('ethereumjs-util');
const sigUtil = require('@metamask/eth-sig-util');

const Encrypt = () => {

    const [publicKey, setPublicKey] = useState("");
    const [ message, setMessage ] = useState("");
    const [data, setData] = useState("");
    const [ encryptedMessage, setEncryptedMessage ] = useState("");

    //encrypting the message after publicKey state has been updated
    useEffect(() => {
      if (publicKey !== "") {
        encryptMessage(data, publicKey);
      }
    }, [data, publicKey]);

    const getEncryptionPublicKey = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (publicKey === "") {
        const key = await window.ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [accounts[0]], // you must have access to the specified account
        });
    
        setPublicKey(key);
    }
  }

  const encryptMessage = (message, publicKey) => {
    const encryptMessage = ethUtil.bufferToHex(
        Buffer.from(
          JSON.stringify(
            sigUtil.encrypt({
              publicKey: publicKey,
              data: message,
              version: 'x25519-xsalsa20-poly1305',
            })
          ),
          'utf8'
        )
      );
      setEncryptedMessage(encryptMessage);
}

    function handleEncryptClick () {
      getEncryptionPublicKey();
      setData(message);
    }

    return(
        <Card sx={{width: 500, maxWidth: 500}}>
            <CardContent>
            <Typography gutterBottom textAlign="center" fontWeight="bold">Encryption via Public Key</Typography>
              <Stack direction="column" spacing={3}>
                <TextField fullWidth multiline label="Transaction Data" value={message} onChange={(e) => {setMessage(e.target.value)}}/>
                <Button variant="contained" onClick={() => {handleEncryptClick()}}>Encrypt Message</Button>
                <Typography sx={{overflowWrap: "break-word"}}>{encryptedMessage}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Encrypt;