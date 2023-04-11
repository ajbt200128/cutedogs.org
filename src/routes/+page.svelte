<script>
    import {
        SvelteUIProvider,
        Switch,
        Container,
        Badge,
        Group,
        Paper,
        Text,
        Center,
        Title,
        Stack,
        ActionIcon,
        Space,
        Anchor,
    } from "@svelteuidev/core";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaLinkedin from "svelte-icons/fa/FaLinkedin.svelte";
    import FaAddressCard from "svelte-icons/fa/FaAddressCard.svelte";
    import FaCcPaypal from "svelte-icons/fa/FaCcPaypal.svelte";

    let isDark = false;
    function toggleTheme() {
        isDark = !isDark;
    }
    import { createStyles } from "@svelteuidev/core";

    const useStyles = createStyles((theme) => {
        return {
            root: {
                [`${theme.dark} &`]: {
                    // using of SvelteUI utilities
                    // bc === backgroundColor
                    bc: theme.colors["dark500"].value,
                },
                // subscribe to color scheme changes right in your styles
                // use theme functions to make styling easier
                backgroundColor: theme.colors["violet50"].value,
            },
        };
    });

    $: ({ classes, getStyles } = useStyles());
</script>

<SvelteUIProvider withGlobalStyles themeObserver={isDark ? "dark" : "light"}>
    <Container size="md" override={{ px: "xs" }}>
        <Space h="xl" />
        <Paper class={getStyles()}>
            <Space h="md" />
            <Stack spacing="md" align="center">
                <Title order={1}>Austin Theriault</Title>
                <Container>
                    <Group spacing="xs" position="center">
                        <Container
                            ><ActionIcon
                                color="dark"
                                root="a"
                                href="https://github.com/ajbt200128"
                                external={true}><FaGithub /></ActionIcon
                            ></Container
                        >
                        <Container
                            ><ActionIcon
                                color="dark"
                                root="a"
                                href="https://www.linkedin.com/in/austin-theriault-1648b2168/"
                                external={true}><FaLinkedin /></ActionIcon
                            ></Container
                        >
                        <Container
                            ><ActionIcon
                                color="dark"
                                root="a"
                                href="mailto:austin@cutedogs.org"
                                ><FaAddressCard /></ActionIcon
                            ></Container
                        >
                        <Container
                            ><ActionIcon
                                color="dark"
                                root="a"
                                href="https://paypal.me/austintheriault"
                                external={true}><FaCcPaypal /></ActionIcon
                            ></Container
                        >
                    </Group>
                </Container>
                <Group>
                    <Badge
                        variant="gradient"
                        gradient={{ from: "grape", to: "pink" }}
                        >Likes Trains</Badge
                    ><Badge
                        variant="gradient"
                        gradient={{ from: "grape", to: "pink" }}
                        >Chronically Online</Badge
                    ><Badge
                        variant="gradient"
                        gradient={{ from: "grape", to: "pink" }}
                        >Illiterate</Badge
                    >
                </Group>
                <Title order={2}>9 to 5</Title>
                <Container size="sm">
                    <Text
                        >Currently working as a fullstack engineer on the program analysis team at <Anchor
                            href="https://semgrep.dev"
                            external={true}>Semgrep, Inc</Anchor
                        >. Day to day I write OCaml, Python, and some
                        Typescript, usually while hacking on our extension.
                    </Text>
                </Container>
                <Title order={2}>6 to 10</Title>
                <Container size="sm">
                    <Text>
                        I spend too much time configuring Emacs and Linux. I
                        like reading, food, skiing, biking, movies and music.
                    </Text>
                </Container>
                <Center>
                    <Switch on:change={toggleTheme} />
                </Center>
            </Stack>
        </Paper>
    </Container>
</SvelteUIProvider>

<style>
</style>
