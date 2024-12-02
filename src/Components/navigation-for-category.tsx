// Radix-UI
import * as Tabs from '@radix-ui/react-tabs'

// Interface
import { Users } from '../interfaces/homeTypes'

export const NavigationForCategory = ({products}:{products:Users[]}) => {
    return(
        <Tabs.Root>
            <Tabs.List>
                <Tabs.Trigger value='all'>Todos os produtos</Tabs.Trigger>
                <Tabs.Trigger value='t-shirts'>Camisetas</Tabs.Trigger>
                <Tabs.Trigger value='mugs'>Canecas</Tabs.Trigger>
            </Tabs.List>

            {/* Section */}
            <Tabs.Content value='all'>
                
            </Tabs.Content>

            <Tabs.Content value='t-shirts'>

            </Tabs.Content>

            <Tabs.Content value='mugs'>

            </Tabs.Content>
        </Tabs.Root>
    )
}