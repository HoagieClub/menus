import {
    Card, Heading, majorScale, Paragraph,
} from 'evergreen-ui';

interface MenuCardProps {
    /** the name of the dining hall */
    college:string;
     /** list of meal option objects */
    food?: Array<any>;
    size?:number;
}

export default function MenuCard({
    college, food = [], size = 0,
}:MenuCardProps) {
    const foods = food.slice(0, size)

    return (
        <Card
            background="gray50"
            borderRadius={8}
            padding={32}
            marginX={majorScale(2)}
            marginY={majorScale(2)}
            minWidth={288}
            flex="0 0 0"
        >
            <Heading is="h3" size={800} marginBottom={majorScale(2)}>{college}</Heading>
            {
                foods.map(({ title, items }) => (
                    <>
                        <Heading is="h4" size={400} marginTop={12} marginBottom={4}>
                            <b>{title}</b>
                        </Heading>

                        {items.map((item) => (
                            <Paragraph color="gray900" size={400} margin={0}>
                                {item}
                            </Paragraph>
                        ))}
                    </>
                ))
            }
        </Card>
    )
}
