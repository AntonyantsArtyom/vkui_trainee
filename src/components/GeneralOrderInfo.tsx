import { Div, Group, Spacing, Title } from "@vkontakte/vkui"
import Store from "../Store"

import { observer } from "mobx-react-lite"

function GeneralOrderInfo() {
   return (
      <Group>
         <Div style={{ height: "80vh", textAlign: "center" }}>{Store.totalPrice !== 0 && <Title>Итого: {Store.totalPrice} руб.</Title>}</Div>
         <Spacing size={5} />
      </Group>
   )
}

export default observer(GeneralOrderInfo)
