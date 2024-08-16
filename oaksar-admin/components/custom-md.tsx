import Markdown from 'react-markdown';

const CustomMd = ({ text }: { text: string }) => {
    return (
        <Markdown
            components={{
                h1: ({ node, ...props }) => <h1 className='mb-5 text-3xl font-medium' {...props} />,
                h2: ({ node, ...props }) => <h2 className='text-2xl font-medium' {...props} />,
                p: ({ node, ...props }) => <p className='mb-4' {...props} />,
                ol: ({ node, ...props }) => <ol className='mb-2' {...props} />,
                li: ({ node, ...props }) => <li className='mb-2' {...props} />,
            }}>
            {text}
        </Markdown>
    );
};
export default CustomMd;
