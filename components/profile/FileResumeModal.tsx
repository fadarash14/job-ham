import React, { Dispatch, useState } from "react";
import styled from "styled-components";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";
import { setFileResume } from "@/requests/cv";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  show: boolean;
  setShow: Dispatch<boolean>;
};
const Container = styled.div`
  min-width: 550px;
  padding: 10px;
  margin: 0 auto;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
`;
const Body = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  border: none;
  width: 120px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  background-color: #db143d;
  color: #ffffff;
  margin-top: 20px;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  .name{
    display: flex;
    flex-direction: column;
    gap: 3px;
    label{
      font-size: 12px;
    }
  }
`;
const Input = styled.input`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 30px;
  background: white;
  width: 200px;
  min-width: 125px;
  &.onFocus {
    &:focus {
      text-align: right;
      direction: ltr;
    }
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
`;
const FileResumeModal = ({ show, setShow }: Props) => {
  const [file, setFile] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const token = Cookies.get("token")!;
  const queryClient = useQueryClient();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.target.files!;
    //@ts-ignore
    let fileName = e.target.files[0].name!;
    let file: string = "";
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      fileName = fileToLoad.name;
      // FileReader function for read the file.
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent?.target?.result! as string;
        // Print data in console
        console.log(file);
        const splited = file.split("data:application/pdf;base64,");
        console.log(splited);
        setFile(splited[1]);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  };
  console.log(file);
  const submitHandler = async () => {
    const res = await setFileResume(file, fileName, token);
    console.log(res);
    if (res.status) {
      setToast({
        show: true,
        message: "رزومه با موفقیت آپلود شد.",
        type: "success",
      });
    } else {
      setToast({
        show: true,
        message: "مشکلی در اپلود رزومه به وجود آمده است",
        type: "error",
      });
    }
    queryClient.invalidateQueries({ queryKey: ["myResume"] });
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      flex={"column"}
      back={"white"}
      height={"60%"}
      width={true}
    >
      <Container>
        <Header>
          {" "}
          <div>آپلود رزومه</div>{" "}
          <Image
            onClick={() => setShow(false)}
            alt="remove"
            height={20}
            width={20}
            src={"/icons/close-icon-modal.svg"}
          />
        </Header>
        <Body>
          <InputWrapper>
            <div className="name">
              <label>نام فایل</label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <input id="file" type="file" onChange={handleFileChange} />
          </InputWrapper>
          <Button onClick={submitHandler}>ثبت</Button>
        </Body>
      </Container>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </ModalSkeleton>
  );
};

export default FileResumeModal;
