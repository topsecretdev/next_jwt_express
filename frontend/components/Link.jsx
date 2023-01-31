import NextLink from 'next/link';

export { Link };

function Link({ href, children, ...props }) {
    return (
        <NextLink href={href} {...props}>
            {/* <a {...props}> */}
                {children}
            {/* </a> */}
        </NextLink>
    );
}
