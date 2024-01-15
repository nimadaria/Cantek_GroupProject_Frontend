import { useEffect } from "react";
import { AppDispatch } from "../config/store";
import { useDispatch, useSelector } from "react-redux";
import { hideResponseMsg } from "../reducers/ResponseMsgReducer";
import { IResponseResultMessageState } from "../models/component/responseMsg.component";
import cheersLogo from "../assets/icon/beer-cheers.svg";
import errorLogo from "../assets/icon/error.svg";

const ResponseResultMessage = () => {
  const dispatch: AppDispatch = useDispatch();

  const responseMsgState = useSelector(
    ({ responseMsg }: { responseMsg: IResponseResultMessageState }) => {
      return responseMsg;
    }
  );

  useEffect(() => {
    if (responseMsgState.isActive) {
      const timer = setTimeout(() => {
        dispatch(hideResponseMsg());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, responseMsgState.isActive]);

  return (
    responseMsgState.isActive &&
    (responseMsgState.isSuccess ? (
      <div className="fixed inset-0 z-100 flex justify-center items-center backdrop-blur-sm bg-white/30 ">
        <div className="h-60 w-60 bg-white border-2 border-black rounded-lg flex flex-col justify-center items-center p-2">
          <img src={cheersLogo} className="h-32 w-32" alt="arrow" />
          <div>Request Success</div>
          {responseMsgState.message && responseMsgState.message !== "" ? (
            <div>{responseMsgState.message}</div>
          ) : (
            <div>Cheers!</div>
          )}
        </div>
        <div
          className="fixed h-full w-full"
          onClick={() => dispatch(hideResponseMsg())}
        ></div>
      </div>
    ) : (
      <div className="fixed inset-0 z-100 flex justify-center items-center backdrop-blur-sm bg-white/30 ">
        <div className="h-60 w-fit min-w-60 bg-white border-2 border-black rounded-lg flex flex-col justify-center items-center p-2">
          <img src={errorLogo} className="h-32 w-32" alt="arrow" />
          <div>Request Failed</div>
          <div>{responseMsgState.message}</div>
        </div>
        <div
          className="fixed h-full w-full"
          onClick={() => dispatch(hideResponseMsg())}
        ></div>
      </div>
    ))
  );
};

export default ResponseResultMessage;
