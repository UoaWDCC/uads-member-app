export interface Settings {
  /**
   * The input/schema directory
   * Directory must exist
   */
  schemaDirectory: string;
  /**
   * The output/type directory
   * Will also attempt to create this directory
   */
  typeOutputDirectory: string;
  /**
   * Use .label('InterfaceName') instead of .meta({className:'InterfaceName'}) for interface names
   */
  useLabelAsInterfaceName: boolean;
  /**
   * Should interface properties be defaulted to optional or required
   * @default false
   */
  defaultToRequired: boolean;
  /**
   * What schema file name suffix will be removed when creating the interface file name
   * @default "Schema"
   * This ensures that an interface and Schema with the file name are not confused
   */
  schemaFileSuffix: string;
  /**
   * If `true` the console will include more information
   * @default false
   */
  debug: boolean;
  /**
   * File Header content for generated files
   */
  fileHeader: string;
  /**
   * If true will sort properties on interface by name
   * @default true
   */
  sortPropertiesByName: boolean;
  /**
   * If true will not output to subDirectories in output/interface directory. It will flatten the structure.
   */
  flattenTree: boolean;
  /**
   * If true will only read the files in the root directory of the input/schema directory. Will not parse through sub-directories.
   */
  rootDirectoryOnly: boolean;
  /**
   * If true will write all exports *'s to root index.ts in output/interface directory.
   */
  indexAllToRoot: boolean;
  /**
   * Comment every interface and property even with just a duplicate of the interface and property name
   * @default false
   */
  commentEverything: boolean;
  /**
   * List of files or folders that should be ignored from conversion. These can either be
   * filenames (AddressSchema.ts) or filepaths postfixed with a / (addressSchemas/)
   * @default []
   */
  ignoreFiles: string[];
  /**
   * The indentation characters
   * @default '  ' (two spaces)
   */
  indentationChacters: string;
}
