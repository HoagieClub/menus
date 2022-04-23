import { useEffect } from 'react';
import { majorScale, Pane } from 'evergreen-ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import router from 'next/router';
import MenuCard from '../../components/MenuCard';
import DateWidget from '../../components/DateWidget';

export default withPageAuthRequired(() => {
    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const queryParams = new URLSearchParams(location.search)

        if (queryParams.has('code')) {
            queryParams.delete('code')
            queryParams.delete('state')
            // TODO: add support for other params to persist using
            // queryParam.toString() or remove the queryParams method
            router.replace('/app', undefined, { shallow: true })
        }
    }, [])

    const food = [
        { title: 'Main Entree', items: ['(more) Beef Stew and Rice'] },
        { title: 'Vegetarian + Vegan Entree', items: ['"Beef" Stew and Rice'] },
        { title: 'Soups', items: ['New England Clam (?) Chowder', 'Tomato-Basil Soup'] },
        { title: 'Salad Bar', items: ['Literally Just Arugula'] },
    ]

    return (
        <>
            <Pane
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                paddingX={majorScale(3)}
                marginY={majorScale(1)}
            >
                <DateWidget />
            </Pane>
            <Pane
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                marginY={majorScale(2)}
                paddingX={majorScale(3)}
            >
                <MenuCard college="Mathey" food={food} size={4} />
                <MenuCard college="Whitman" food={food} size={4} />
                <MenuCard college="First" food={food} size={4} />
                <MenuCard college="Butler" food={food} size={4} />
                <MenuCard college="Forbes" food={food} size={4} />
                <MenuCard college="Graduate College" food={food} size={4} />
            </Pane>
        </>
    );
});
