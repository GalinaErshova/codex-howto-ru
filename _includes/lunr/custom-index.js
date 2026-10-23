// The default English pipeline trims Cyrillic out of indexed tokens.
// Keep Unicode tokens intact in both indexing and queries; prefix search
// remains provided by Just the Docs. This is not morphological search.
if (!this.codexUnicodeSearchConfigured) {
  this.pipeline.reset();
  this.searchPipeline.reset();
  this.codexUnicodeSearchConfigured = true;
}
