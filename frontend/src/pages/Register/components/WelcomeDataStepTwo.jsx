import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Camera } from "lucide-react";
import { Button } from "primereact/button";
import Samla from "../../../assets/Layer 1.svg"
import { useTranslation } from "react-i18next";

const WelcomeDataStepTwo = () => {
  const [image, setImage] = useState(null);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const webcamRef = useRef(null);

  const {
    getValues,
    setValue,
    formState: { errors },
    reset
  } = useFormContext();

  const { t } = useTranslation();

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  };
  const detectFace = async (imgSrc) => {
  const img = new Image();
  img.src = imgSrc;


  img.onload = async () => {
    try {
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
      setFaceDetected(detections.length > 0);
      // console.log("🚀 ~ Rostros detectados:", detections.length > 0);
    } catch (error) {
      console.error("Error al detectar rostros:", error);
      setFaceDetected(false);
    }
  };

  img.onerror = () => {
    console.error("Error al cargar la imagen");
    setFaceDetected(false);
  };
  };

  const capturePhoto = async () => {
    setValue("loading", true);
    if (webcamRef.current) {
      const imgSrc = webcamRef.current.getScreenshot();
      setImage(imgSrc);
      await detectFace(imgSrc);
      setValue("facePhoto", imgSrc, { shouldValidate: true });
      setWebcamOpen(false);
    }
    setValue("loading", false);

  };

  const onSubmit = async() => {
    setValue("loading", true);
    const dataToSend = {
      nombres: getValues("firstName"),
      apellidos: getValues("lastName"),
      email: getValues("email"),
      telefono: getValues("phoneNumber"),
      tipoIdentificacion: getValues("idType"),
      numeroIdentificacion: getValues("idNumber"),
      departamento: getValues("department"),
      municipio: getValues("municipality"),
      direccion: getValues("address"),
      ingresosMensuales: getValues("monthlyIncome") || 0
    };
    console.log("🚀 ~ onSubmit ~ dataToSend:", dataToSend)
    try {
      const response = await axios.post("http://localhost:3000/api/persons", dataToSend);
      console.log("response", response); 
      setValue("loading", false);
      if(response.status === 201){
        reset();
        setValue("step", 0);
      }
    } catch (error) {
      setValue("loading", false);
    }
  };

  return (
    <div  className="w-full h-screen flex flex-col">
      <div className='h-7 w-full bg-cover bg-center bg-no-repeat'  
        style={{ backgroundImage: 'url("/bg_img.png"), radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%)'}}
      ></div> 
      <div className="flex flex-col items-center w-full h-full align-middle justify-center gap-2">
      <img className='p-1 w-30 pb-8' src={Samla} />
        <Camera className="w-16 h-16 text-[#667085] m-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t("facePhoto.selfie")}</h2>
        <p className="text-gray-500 mb-6">{t("facePhoto.smile")}</p>

        {!webcamOpen && (
          <Button className={`${faceDetected? "!bg-[#667085] hover:!bg-[#667085]/80 !border-[#667085]":"!bg-primary hover:!bg-primary/80 !border-primary"}  sm:w-1/8  !rounded-lg h-10  `} onClick={() => setWebcamOpen(true)} label={`${faceDetected ? t("takeAgain"): t("continue")}`} />
        )}

        {webcamOpen && [
          <div className="mt-6">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-lg  mb-5" />
          </div>,
          <Button className="sm:w-1/8 !bg-primary !rounded-lg h-10  hover:!bg-primary/80 !border-primary" onClick={capturePhoto} label={t("capture")}/>
        ]}

        {image && (
          <div className="mt-6">
            <img src={image} alt="captured" className="w-48 h-48 mx-auto rounded-lg shadow-md" />
            {faceDetected !== null && (
              <p className={`mt-4 ${faceDetected ? "text-green-500" : "text-red-500"}`}>
                {faceDetected ? t("facePhoto.faceDetected") : t("facePhoto.noFaceDetected")}
              </p>
            )}
          </div>
        )}
        {errors.facePhoto && <p className="text-red-500 text-sm mt-2">{errors.facePhoto.message}</p>}
       { faceDetected && 
        <Button className=" sm:w-1/8 !bg-primary !rounded-lg h-10  hover:!bg-primary/80 !border-primary" onClick={onSubmit} label={t("submit")}/>}
      </div>
    </div>
  );
};

export default WelcomeDataStepTwo