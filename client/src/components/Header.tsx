import { useState } from 'react';
import {
    AppShell,
    Header,
    Footer,
    Text,
    Title,
    useMantineTheme,
    Group,
    Grid,
    Container,
    Card,
    Badge,
    Button,
    Image,
    rem,
    Center,
} from '@mantine/core';
import ThemeButton from './ThemeButton';

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
                        <Title order={4}>SEP Search</Title>
                        <Group sx={{ height: '100%' }} px={20} position="right">
                            <ThemeButton />
                        </Group>
                    </div>
                </Header>
            }
        >
            {/* ALL application stuff should be put here! */}
            <Container size="70%">
                <Center mx="auto">
                    <Grid justify="space-around" gutter="xl" grow>
                        <Grid.Col md={5} lg={5} style={{ minHeight: rem("80vh") }}>
                            <Card shadow="sm" padding="xl" radius="md" withBorder style={{ minHeight: rem("100%") }}>
                                <Card.Section>
                                    <Image
                                        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                        height={160}
                                        alt="Norway"
                                    />
                                </Card.Section>

                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>Norway Fjord Adventures</Text>
                                    <Badge color="pink" variant="light">
                                        On Sale
                                    </Badge>
                                </Group>

                                <Text size="sm" color="dimmed">
                                    With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                                    activities on and around the fjords of Norway
                                </Text>

                                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                    Book classic tour now
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={6} style={{ minHeight: rem("80vh") }}>
                            <Card shadow="sm" padding="xl" radius="md" withBorder style={{ minHeight: rem("100%") }}>
                               
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Center>
            </Container>
        </AppShell>
    );
}