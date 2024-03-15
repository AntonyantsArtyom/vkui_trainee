import { Alert } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite"
import Store from "../Store"

function ConfirtDeleteAlert() {
   return (
      <>
         {Store.confirmActionText !== "" && (
            <Alert
               actions={[
                  {
                     title: "Отмена",
                     mode: "cancel",
                  },
                  {
                     title: "Да",
                     mode: "destructive",
                     action: () => Store.deleteProduct(Store.pickedProductId),
                  },
               ]}
               onClose={() => Store.clearConfirmActionText()}
               text={Store.confirmActionText}
            />
         )}
      </>
   )
}

export default observer(ConfirtDeleteAlert)
