import React from 'react'
import { Dropdown , Menu , Image} from 'semantic-ui-react'


export default function SignedIn(props) {
  return (
    <div>
        <Menu.Item>
            <Image avatar spaced="bottom" src="https://yt3.ggpht.com/yti/AHyvSCAkry1B4qWxft0Mz8zkZJexlkgtx39gIvoYODzQUQ=s108-c-k-c0x00ffffff-no-rj"></Image>
            <Dropdown pointing="top left" text="Burak">
                <Dropdown.Menu>
                    <Dropdown.Item text="Bilgilerim" icon="info"></Dropdown.Item>
                    <Dropdown.Item onClick={props.signOut} text="Çıkış Yap" icon="sign-out"></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    </div>
  )
}
