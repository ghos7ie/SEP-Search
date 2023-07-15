import { useState } from 'react';
import { AppShell, Header, Footer, Title, useMantineTheme, Group, Grid, Card, } from '@mantine/core';
import ThemeButton from './ThemeButton';
import SearchForm from './SearchForm';

export default function HeaderBar() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            footer={
                <Footer height={60} p="md">
                    Created by Lewis
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Group>
                            <Title order={4}>SEP Search</Title>
                            <ThemeButton />
                        </Group>
                    </div>
                </Header>
            }
        >
            <div style={{ maxWidth: '80%', margin: '0 auto' }}>
                <Grid gutter="lg">
                    <Grid.Col span={12} sm={12} md={4} lg={4}>
                        <Card shadow="sm" padding="lg" radius="md" style={{ height: '100%' }}>
                            <SearchForm />
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={12} sm={12} md={8} lg={8}>
                        <Card shadow="sm" padding="lg" radius="md" style={{ height: '100%' }}>
                            {/* Content for the second card */}
                        </Card>
                    </Grid.Col>
                </Grid>
            </div>
        </AppShell>
    );
}