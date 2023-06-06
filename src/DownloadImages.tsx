import domtoimage from 'dom-to-image';

export const DownloadImage = (node: HTMLElement, filename: string) => {
  domtoimage
    .toPng(node, { height: node.scrollHeight, width: node.scrollWidth })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((dataUrl: any) => {
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    });
};
