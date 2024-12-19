interface Props {
  content: string;
}

export const CellTableProduct = ({ content }: Props) => {
  return (
    <>
      <td className="p-4 font-medium tracking-tight">
        {content}
      </td>
    </>
  );
};
