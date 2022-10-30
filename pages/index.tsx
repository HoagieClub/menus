import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Pane, majorScale, minorScale, Button, WarningSignIcon,
} from 'evergreen-ui'
import Link from 'next/link'

export default function Index() {
    const AccessUI = (
        <Pane>
            <Link href="/app">
                <Button
                    height={56}
                    width={majorScale(35)}
                    appearance="primary"
                    marginBottom={20}
                    iconBefore={WarningSignIcon}
                >
                    Access the App
                </Button>
            </Link><br />
        </Pane>
    );

    const router = useRouter()
    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const queryParams = new URLSearchParams(location.search)

        if (queryParams.has('code')) {
            queryParams.delete('code')
            queryParams.delete('state')
            // TODO: add support for other params to persist using
            // queryParam.toString() or remove the queryParams method
            router.replace('/', undefined, { shallow: true })
        }
    }, [])
    return (
        <Pane
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginX={majorScale(1)}
            paddingBottom={majorScale(4)}
            paddingTop={majorScale(8)}
        >
            <Pane
                borderRadius={8}
                textAlign="center"
                elevation={1}
                background="white"
                marginX={20}
                maxWidth="600px"
                width="100%"
                paddingX="10px"
                paddingTop={majorScale(5)}
                paddingBottom={majorScale(7)}
            >
                <WarningSignIcon size={100} color="warning" />
                <h1 className="hoagie">hoagie<b>menus</b></h1>
                <p>Development Version</p>
                <div>
                    <Pane
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="30px"
                    >
                        { AccessUI }
                        <Link href="https://hoagie.io">
                            <Button
                                height={56}
                                width={majorScale(35)}
                                appearance="default"
                                marginTop={20}
                            >
                                <Pane display="flex" className="hoagie">
                                    Back to
                                    <Pane marginLeft={minorScale(1)}>
                                        hoagie<b>platform</b>
                                    </Pane>
                                </Pane>
                            </Button>
                        </Link><br />
                    </Pane>
                </div>
            </Pane>
        </Pane>
    );
}
