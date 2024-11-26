// Radix-UI
import * as Tabs from '@radix-ui/react-tabs'

export const NavigationForCategory = () => {
    return(
        <Tabs.Root>
            <Tabs.List>
                <Tabs.Trigger value='allProducts'>Todos os produtos</Tabs.Trigger>
                <Tabs.Trigger value='t-shirts'>Camisetas</Tabs.Trigger>
                <Tabs.Trigger value='mugs'>Canecas</Tabs.Trigger>
            </Tabs.List>

            {/* Section */}
            <Tabs.Content value='allProducts'>

            </Tabs.Content>

            <Tabs.Content value='t-shirts'>

            </Tabs.Content>

            <Tabs.Content value='mugs'>

            </Tabs.Content>
        </Tabs.Root>
    )
}