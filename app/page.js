"use client";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const q = query(collection(firestore, 'inventory'));
    const snapshot = await getDocs(q);
    const inventoryList = [];
    snapshot.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      bgcolor="#f0f0f0"
    >
      <Typography variant="h4" gutterBottom>
        Inventory Items
      </Typography>
      <Box
        width="50%"
        maxHeight="50vh"
        overflow="auto"
        p={2}
        border="1px solid #ccc"
        borderRadius="8px"
        bgcolor="white"
        boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
        mb={4}
      >
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <Box key={index} display="flex" justifyContent="space-between" alignItems="center" p={1}>
              <Typography>{item.name}</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>{item.quantity}</Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="small" 
                  onClick={() => removeItem(item.name)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No items in inventory.</Typography>
        )}
      </Box>
      <Button variant="outlined" onClick={handleOpen}>Add Item</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
