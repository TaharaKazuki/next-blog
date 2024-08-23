import { MDXRemote } from 'next-mdx-remote/rsc';

const createHeading = (level: number) => {};

const components = {
  h1: createHeading(1),
};

const CustomMDX = (props: any) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    >
      mdx
    </MDXRemote>
  );
};

export default CustomMDX;
