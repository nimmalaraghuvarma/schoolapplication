import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";

import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { ShieldCloseIcon } from "lucide-react";

export default function ContactDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    studentName: "",
    className: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await emailjs.send(
        "service_5luudin",
        "template_xoct28p",
        {
          parent_name: formData.parentName,
          phone: formData.phone,
          student_name: formData.studentName,
          class_name: formData.className,
          message: formData.message,
        },
        "ubDHpz1TCTL6sgLGK"
      );

      toast.success("Enquiry Submitted Successfully");

      setFormData({
        parentName: "",
        phone: "",
        studentName: "",
        className: "",
        message: "",
      });

      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit enquiry");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: "#6b1a1a",
        }}
      >
        Admission Enquiry

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <ShieldCloseIcon/>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Parent Name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Applying Class"
              name="className"
              value={formData.className}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "#6b1a1a",
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  background: "#4e1212",
                },
              }}
            >
              Submit Enquiry
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}