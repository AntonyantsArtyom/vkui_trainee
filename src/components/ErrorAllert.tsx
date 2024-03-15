import { Alert } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite"
import Store from "../Store"

function ErrorAlert() {
   return (
      <>
         {Store.errorText !== "" && (
            <Alert
               actions={[
                  {
                     title: "Ок",
                     mode: "cancel",
                  },
               ]}
               onClose={() => Store.clearErrorText()}
               text={Store.errorText}
            />
         )}
      </>
   )
}

export default observer(ErrorAlert)
