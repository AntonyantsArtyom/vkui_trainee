import {
   SplitLayout,
   SplitCol,
   View,
   Panel,
   PanelHeader,
   ScreenSpinner,
   PanelHeaderButton,
   AdaptivityProvider,
   AppRoot,
   ConfigProvider,
} from "@vkontakte/vkui"

import "@vkontakte/vkui/dist/vkui.css"
import "./style.css"

import ProductList from "./components/ProductList"
import GeneralOrderInfo from "./components/GeneralOrderInfo"

import { observer } from "mobx-react-lite"
import ErrorAllert from "./components/ErrorAllert"
import ConfirtDeleteAlert from "./components/ConfirmDeleteAllert"
import { Icon20SunOutline, Icon20MoonOutline } from "@vkontakte/icons"
import Store from "./Store"

function App() {
   return (
      <ConfigProvider appearance={Store.mode}>
         <AdaptivityProvider>
            <AppRoot>
               <View activePanel="basket">
                  <Panel id="basket">
                     <PanelHeader
                        after={
                           <PanelHeaderButton style={{ marginRight: "15px" }} aria-label="выбор темы" onClick={() => Store.changeMode()}>
                              {Store.mode == "dark" ? <Icon20SunOutline /> : <Icon20MoonOutline />}
                           </PanelHeaderButton>
                        }
                     >
                        Корзина
                     </PanelHeader>
                     <SplitLayout
                        popout={
                           <>
                              {Store.requestStatus && <ScreenSpinner state={Store.requestStatus} />}
                              <ErrorAllert />
                              <ConfirtDeleteAlert />
                           </>
                        }
                     >
                        <SplitCol width={"75%"}>
                           <ProductList />
                        </SplitCol>
                        <SplitCol width={"25%"} minWidth={"140px"}>
                           <GeneralOrderInfo />
                        </SplitCol>
                     </SplitLayout>
                  </Panel>
               </View>
            </AppRoot>
         </AdaptivityProvider>
      </ConfigProvider>
   )
}

export default observer(App)
